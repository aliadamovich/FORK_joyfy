import React from 'react'
import s from './AuthForm.module.scss'
import { useForm } from "react-hook-form"
import { Button } from '@/shared/UI/button'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormCheckbox } from './formFields/FormCheckbox'
import { Card } from '@/shared/UI/card'
import { Typography } from '@/shared/UI/typography'
import { FormTextField } from './formFields/FormTextField'

type AuthSchemaT = z.infer<typeof AuthSchema>;

const AuthSchema = z.object({
	username: z
	.string()
	.min(6, 'Field should be more than 6 letters')
	.max(30, 'Field should be less than 30 letters').regex(/^[A-Za-z0-9_-]+$/, 'Invalid symbols'),

	email: z
	.string()
	.email('Invalid email'),

	password: z
	.string()
	.min(6)
	.max(20)
		.regex(/[0-9A-Za-z!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]/, 'invalid symbols'),

	confirmPassword: z.string(),

	agreeToTerms: z.literal(true, {errorMap: () => ({message: 'You must agree the terms & conditions'})})

})
.refine((d)=> d.password === d.confirmPassword, {
	message: 'Passwords don\'t match',
	path: ['confirmPassword'],
})

export const AuthForm = () => {

	const { 
		handleSubmit,
		control,
		// register, //вместо него использую control
		// formState: { errors },
		// setError - отлавливать ошибки с сервера
	} = useForm<AuthSchemaT>({
		resolver: zodResolver(AuthSchema),
		// mode: 'onChange' //когда показывать ошибки (при нажатии, при блюре и тд)
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	})

	return (
		<div className={s.formContainer}>
			<Card className={s.card}>
				<Typography as='h1' variant='h1' className={s.typo}>Sign up</Typography>
				<form onSubmit={onSubmit} className={s.form}>

					{/* <TextField label='Username' {...register('username')} errorMessage={errors.username?.message}/>
					<TextField label='Email' {...register('email')} errorMessage={errors.email?.message} />
					<TextField label='Password' {...register('password')} errorMessage={errors.password?.message} />
					<TextField label='Confirm password' {...register('confirmPassword')} errorMessage={errors.confirmPassword?.message}/> */}
					
					<FormTextField label='Username' control={control} name='username'/>
					<FormTextField label='Email' control={control} name='email'/>
					<FormTextField label='Password' control={control} name='password'/>
					<FormTextField label='Confirm password' control={control} name='confirmPassword'/>

					<FormCheckbox name='agreeToTerms' control={control} label='I agree to the Terms of Service and Privacy Policy'/>

					<Button type='submit' className={s.button}>Sign Up</Button>

				</form>
			</Card>
		</div>
	)
}
