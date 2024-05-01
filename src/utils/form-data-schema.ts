import { ZodType, z } from "zod";

export const formDataSchema = z.object({
	name: z.string({ required_error: "Please enter your name" }),
	email: z.string({ required_error: "Please enter your email" }).email("Invalid email address!"),
	avatar: z.any() as ZodType<File>,
	mobileNo: z.string({ required_error: "Please enter your mobile number" }),
	role: z.string({ required_error: "Select your role" }),
	verified: z.boolean().default(false).optional(),
	profession: z.enum(["student", "jobHolder"], {
		required_error: "You have to select a profession.",
	}),
	location: z.object({
		city: z.string({ required_error: "City name is require" }),
		address: z.string({ required_error: "Address name is required" }),
		country: z.string().optional(),
	}),
});
