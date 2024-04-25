// import { FC } from "react";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { Inputs } from "./form2";
import { ChangeEvent, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

// interface Props {
// 	form: UseFormReturn<Inputs>;
// }
const PersonalInfoForm = () => {
	const { control } = useFormContext<Inputs>();
	const [selectedAvatar, setSelectedAvatar] = useState<File>();

	const handleSelectAvatar = (e: ChangeEvent<HTMLInputElement>, onChange: (e: File) => void) => {
		if (e?.target?.files) {
			// const image = Array.from();
			onChange(e.target.files[0]);
			setSelectedAvatar(e.target.files[0]);
		}
	};

	return (
		<>
			<FormField
				control={control}
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
				control={control}
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
			<FormField
				control={control}
				name="avatar"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Add avatar</FormLabel>
						<FormControl>
							<Input
								type="file"
								onChange={(e) => handleSelectAvatar(e, field.onChange)}
								className="hidden"
								multiple
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{selectedAvatar && (
				<div>
					<Avatar className="block mx-auto">
						<AvatarImage
							src={URL.createObjectURL(selectedAvatar)}
							alt="Selected avatar"
							className="object-cover"
						/>
					</Avatar>
				</div>
			)}
		</>
	);
};

export default PersonalInfoForm;
