import {
  authControllerIsNameTake,
  authControllerSingIn,
  authControllerSingUp,
} from '@/shared/api/orvalBack/generated'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
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
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  identifier: z.string().min(4),
})

export default function SignIn() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      authControllerSingIn({ identifier: identifier, password: password }),
    onSuccess: () => navigate(`${PATH.HOME}`),
    onError: () => {
      form.setError('identifier', {
        type: 'manual',
        message: 'Invalid username or password.',
      })
      return
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ identifier: values.identifier, password: values.password })
  }
  return (
    <div className="flex  h-full w-full items-center justify-center pt-64">
      <div className=" px-auto flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name or email</FormLabel>
                  <FormControl>
                    <Input placeholder="identifier" {...field} />
                  </FormControl>
                  {/* <FormDescription></FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  {/* <FormDescription>display password</FormDescription> */}
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
