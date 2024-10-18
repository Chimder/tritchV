import { useAccountInfo } from '@/features/auth/useSession'
import { authControllerSingIn } from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
  const { refetch } = useAccountInfo()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      authControllerSingIn({ identifier: identifier, password: password }),
    onSuccess: () => {
      refetch()
      navigate(`${PATH.HOME}`)
    },
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
    <div className="flex h-full w-full items-center justify-center pt-64">
      <div className=" px-auto flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link className="flex justify-end text-green-700" to={PATH.REQRESPASS}>
              Forgot Password
            </Link>
            <Button
              disabled={form.formState.isSubmitting}
              className={cn(
                'w-full text-white',
                `${isSuccess ? 'bg-green-600 hover:bg-green-600' : 'bg-purple-400'}`,
              )}
              type="submit"
            >
              {isPending ? <ReloadIcon className="ml-1 h-4 w-4 animate-spin" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
