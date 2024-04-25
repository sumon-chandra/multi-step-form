import { ZodType, z } from "zod";

export const formDataSchema = z.object({
	name: z.string().min(1, "Name is required!"),
	email: z.string().min(1, "Email is required!").email("Invalid email address!"),
	avatar: z.any() as ZodType<File>,
	city: z.string().min(1, "City name is required!"),
	mobileNo: z.string(),
	role: z.string(),
	verified: z.boolean().default(false),
	profession: z.enum(["student", "jobHolder"], {
		required_error: "You have to select a profession.",
	}),
});
