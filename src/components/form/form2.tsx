import { formDataSchema } from "@/utils/form-data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { steps } from "@/utils/multi-form-steps";
import OtherInfoForm from "./other-info-form";
import PersonalInfoForm from "./personal-info-form";
// import CompleteMessage from "./complete-message";
import LocationForm from "./location-form";

export type Inputs = z.infer<typeof formDataSchema>;

const FormTwo = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [previousStep, setPreviousStep] = useState(0);
	const delta = currentStep - previousStep;

	const form = useForm<Inputs>({
		resolver: zodResolver(formDataSchema),
	});

	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log("Processing form");
		console.log({ user: data });
	};

	const next = async () => {
		const fields = steps[currentStep].fields;

		type FieldName = keyof Inputs;
		const output = await form.trigger(fields as FieldName[], { shouldFocus: true });
		if (!output) return;

		if (currentStep < steps.length) {
			// console.log("Second step count reached");
			if (currentStep === steps.length - 1) {
				// console.log("Final step count reached");
				await form.handleSubmit(processForm)();
			}
			setPreviousStep(currentStep);
			setCurrentStep((step) => step + 1);
		}
	};

	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step - 1);
		}
	};

	return (
		<div className="p-6 bg-slate-200 overflow-hidden">
			<FormProvider {...form}>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(processForm)}>
						{currentStep === 0 && <PersonalInfoForm delta={delta} />}
						{currentStep === 1 && <OtherInfoForm delta={delta} />}
						{currentStep === 2 && <LocationForm />}
					</form>
				</Form>
			</FormProvider>
			<div className="mt-4 flex justify-between">
				<Button onClick={prev}>Prev</Button>
				<Button onClick={next}>Next</Button>
			</div>
		</div>
	);
};

export default FormTwo;
