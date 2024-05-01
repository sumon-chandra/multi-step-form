// import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Inputs } from "./form2";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {
	// form: UseFormReturn<Inputs>;
	delta: number;
}

const OtherInfoForm: FC<Props> = ({ delta }) => {
	const { control } = useFormContext<Inputs>();

	return (
		<motion.div
			className="space-y-4"
			initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<FormField
				control={control}
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
				control={control}
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
							<SelectContent className="bg-white">
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
				control={control}
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
				control={control}
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
		</motion.div>
	);
};

export default OtherInfoForm;
