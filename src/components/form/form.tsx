import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { formDataSchema } from "@/utils/form-data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { steps } from "@/utils/multi-form-steps";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export type Inputs = z.infer<typeof formDataSchema>;

const MultiStepForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	// console.log({ currentStep });

	const form = useForm<Inputs>({
		resolver: zodResolver(formDataSchema),
	});

	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log("Processing");

		console.log(data);
	};

	type FieldName = keyof Inputs;

	const next = async () => {
		const fields = steps[currentStep].fields;
		const output = await form.trigger(fields as FieldName[], { shouldFocus: true });
		console.log({ output });

		if (!output) return;

		if (currentStep < steps.length - 1) {
			console.log("second form");
			if (currentStep === steps.length - 2) {
				console.log("Form submission");

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
		<div className="p-6 bg-neutral-300 rounded">
			<form onSubmit={form.handleSubmit(processForm)}>
				{currentStep === 0 && (
					<>
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your name!"
								{...form.register("name", { required: true })}
							/>
							{form.formState.errors?.name?.message && (
								<p className="text-red-500 font-semibold text-xs">
									{form.formState.errors?.name?.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="text"
								placeholder="Enter your email!"
								{...form.register("email", { required: true })}
							/>
							{form.formState.errors?.email?.message && (
								<p className="text-red-500 font-semibold text-xs">
									{form.formState.errors?.email?.message}
								</p>
							)}
						</div>
					</>
				)}
				{currentStep === 1 && (
					<>
						<div>
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								type="text"
								placeholder="Enter your city name!"
								{...form.register("city", { required: true })}
							/>
							{form.formState.errors?.city?.message && (
								<p className="text-red-500 font-semibold text-xs">
									{form.formState.errors?.city?.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor="mobileNo">Mobile number</Label>
							<Input
								id="mobileNo"
								type="number"
								placeholder="Enter your mobile number!"
								{...form.register("mobileNo")}
							/>
						</div>
						<div>
							<select id="role" {...form.register("role")}>
								<option value="">Select role</option>
								<option value="admin">Admin</option>
								<option value="moderator">Moderator</option>
								<option value="user">User</option>
							</select>
						</div>
					</>
				)}
				{currentStep === 2 && (
					<div>
						<p>Thanks for form submission!</p>
					</div>
				)}
			</form>
			<div className="mt-4 flex justify-between">
				<Button onClick={prev}>Prev</Button>
				<Button onClick={next}>Next</Button>
			</div>
		</div>
	);
};

export default MultiStepForm;
