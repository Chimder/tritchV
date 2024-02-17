import { authControllerIsNameTake, authControllerSingUp } from '@/shared/api/orvalBack/generated'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PATH } from '@/app/routes/path-constants'

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .email({ message: 'not valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  name: z.string().min(4),
})

export default function SignUp() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })
  console.log(form.formState.isSubmitting)

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) =>
      authControllerSingUp({ email: email, password: password, name: name }),
    onSuccess: () => navigate(`${PATH.HOME}`),
    onError: () => {
      form.setError('email', {
        type: 'manual',
        message: 'Try another email ',
      })
      return
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isNameTaken = await authControllerIsNameTake({ name: values.name })
    if (!isNameTaken) {
      form.setError('name', {
        type: 'manual',
        message: 'This name is already taken.',
      })
      return
    }
    mutate({ email: values.email, password: values.password, name: values.name })
  }
  return (
    <div className="flex h-full w-full items-center justify-center pt-64">
      <div className=" px-auto flex w-full justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-72 space-y-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="" type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={cn(
                'w-full text-white',
                `${isSuccess ? 'bg-green-600 hover:bg-green-600' : 'bg-purple-400'}`,
              )}
              type="submit"
            >
              Submit
              {form.formState.isSubmitting && <ReloadIcon className="ml-1 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
