import { SvgSpinnersPulseRings3 } from '@/assets/puls'

type Props = {}

export default function Loading({}: Props) {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background/80">
      <SvgSpinnersPulseRings3 className="animate-spin w-44 h-44" />
    </div>
  )
}
