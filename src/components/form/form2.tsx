import { formDataSchema } from "@/utils/form-data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardHeader } from "../ui/card";
import { steps } from "@/utils/multi-form-steps";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export type Inputs = z.infer<typeof formDataSchema>;

const FormTwo = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const form = useForm<Inputs>({
		resolver: zodResolver(formDataSchema),
	});

	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log("Processing form");
		console.log(data);
	};

	const next = async () => {
		const fields = steps[currentStep].fields;

		type FieldName = keyof Inputs;
		const output = await form.trigger(fields as FieldName[], { shouldFocus: true });
		if (!output) return;

		if (currentStep < steps.length - 1) {
			console.log("Second step count reached");
			if (currentStep === steps.length - 2) {
				console.log("Final step count reached");
				await form.handleSubmit(processForm)();
			}
			setCurrentStep((step) => step + 1);
		}
	};

	const prev = () => {
		if (currentStep > 0) {
			setCurrentStep((step) => step - 1);
		}
	};

	return (
		<div className="p-6 bg-slate-200">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(processForm)}>
					{currentStep === 0 && (
						<>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					{currentStep === 1 && (
						<>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your city name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mobileNo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile number</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter your mobile number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="admin">
													Admin
												</SelectItem>
												<SelectItem value="moderator">
													Moderator
												</SelectItem>
												<SelectItem value="user">
													User
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="verified"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={
													field.onChange
												}
											/>
										</FormControl>
										<FormLabel>Are you verified user?</FormLabel>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="profession"
								render={({ field }) => (
									<FormItem className="mt-2">
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="student" />
													</FormControl>
													<FormLabel className="font-normal">
														Student
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="jobHolder" />
													</FormControl>
													<FormLabel className="font-normal">
														Job holder
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
						</>
					)}
					{currentStep === 2 && (
						<Card>
							<CardHeader>Thanks for form submission!</CardHeader>
						</Card>
					)}
				</form>
			</Form>
			<div className="mt-4 flex justify-between">
				<Button onClick={prev}>Prev</Button>
				<Button onClick={next}>Next</Button>
			</div>
		</div>
	);
};

export default FormTwo;
