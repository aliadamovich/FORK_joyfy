import { TextField, TextFieldProps } from "../../textField/TextField"
import { Control, FieldValues, useController, UseControllerProps } from "react-hook-form"


type Propss<T extends FieldValues> = TextFieldProps
	& Omit<UseControllerProps<T>, 'control' | 'rules' | 'shouldUnregister' | 'defaultValue'>
	& {
		control: Control<T>
	}

export const FormTextField = <T extends FieldValues>({ control, name, ...rest }: Propss<T>) => {
	const { field, fieldState: { error } } = useController({
		control,
		name
	})

	return (
		<TextField errorMessage={error?.message} {...field} {...rest} />
	)
}
