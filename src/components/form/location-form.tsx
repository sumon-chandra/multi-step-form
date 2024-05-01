"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Inputs } from "./form2";
import { Input } from "../ui/input";

const LocationForm = () => {
	const { control } = useFormContext<Inputs>();
	return (
		<div>
			<FormField
				control={control}
				name="location.address"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Address</FormLabel>
						<FormControl>
							<Input placeholder="Enter your address" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="location.city"
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
				control={control}
				name="location.country"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Country</FormLabel>
						<FormControl>
							<Input placeholder="Enter your country name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default LocationForm;
