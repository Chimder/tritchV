import { startTransition } from 'react'
import { authControllerRequestPasswordReset } from '@/shared/api/swagger/generated'
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
})

export default function ReqResPassword() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: ({ email }: { email: string }) =>
      authControllerRequestPasswordReset({ email: email }),
    onSuccess: () => {
      form.reset({ email: 'Check your e-mail' })
      startTransition(() => {
        setTimeout(() => {
          navigate(PATH.SIGNIN)
        }, 3000)
      })
    },
    onError: () => {
      form.setError('email', {
        type: 'manual',
        message: 'Try another email ',
      })
      return
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ email: values.email })
  }
  return (
    <div className="flex h-full w-full items-center justify-center pt-64">
      <div className=" px-auto flex w-full justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-72 space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email to recover your password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
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
