import { AuthForm } from "@/shared/UI/authForm_FORK/AuthForm";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AuthForm> = {
	title: "Components/AuthForm",
	component: AuthForm,
	tags: ["autodocs"],
	argTypes: {
	},
};
export default meta;

export const Default: StoryObj<typeof AuthForm> = {
	args: {

	},
};