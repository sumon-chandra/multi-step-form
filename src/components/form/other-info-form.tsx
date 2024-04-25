import { UseFormReturn } from "react-hook-form";
import { Inputs } from "./form2";
import { FC } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";

interface Props {
	form: UseFormReturn<Inputs>;
}

const OtherInfoForm: FC<Props> = ({ form }) => {
	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name="city"
				render={({ field }) => (
					<FormItem>
						<FormLabel>City</FormLabel>
						<FormControl>
							<Input placeholder="Enter your city name" {...field} />
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
							<Input type="number" placeholder="Enter your mobile number" {...field} />
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
						<FormLabel className="block">Role</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="moderator">Moderator</SelectItem>
								<SelectItem value="user">User</SelectItem>
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
					<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border">
						<FormControl>
							<Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
						<FormLabel>Select your profession</FormLabel>
						<FormControl>
							<RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="student" />
									</FormControl>
									<FormLabel className="font-normal">Student</FormLabel>
								</FormItem>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="jobHolder" />
									</FormControl>
									<FormLabel className="font-normal">Job holder</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	);
};

export default OtherInfoForm;
