import {
  authControllerIsNameTake,
  authControllerPasswordReset,
  authControllerSingUp,
} from '@/shared/api/swagger/generated'
import { cn } from '@/shared/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
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
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
})

export default function ResetPassword() {
  const param = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
    },
  })

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: ({ newPassword }: { newPassword: string }) =>
      authControllerPasswordReset({ newPassword: newPassword, token: param?.token as string }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['account'] })
      navigate(`${PATH.HOME}`)
    },
    onError: () => {
      form.setError('newPassword', {
        type: 'manual',
        message: 'Try another email ',
      })
      return
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.newPassword !== values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'The passwords dont match',
      })
      return
    }
    mutate({ newPassword: values.newPassword })
  }
  return (
    <div className="flex h-full w-full items-center justify-center pt-64">
      <div className=" px-auto flex w-full justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-72 space-y-7">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              className={cn(
                'w-full text-white',
                `${isSuccess ? 'bg-green-600 hover:bg-green-600' : 'bg-purple-400'}`,
              )}
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <ReloadIcon className="ml-1 h-4 w-4 animate-spin" />
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
