import { SvgSpinnersPulseRings3 } from '@/assets/puls'

// type Props = {};

export default function Loading() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background/80">
      <SvgSpinnersPulseRings3 className="h-44 w-44 animate-spin" />
    </div>
  )
}
