import { FC } from "react";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "./form2";

interface Props {
	form: UseFormReturn<Inputs>;
}
const PersonalInfoForm: FC<Props> = ({ form }) => {
	return (
		<>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Enter your name" {...field} />
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
							<Input type="email" placeholder="Enter your email address" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default PersonalInfoForm;