import { Button } from '~/components/ui/button'

export default function TestPage() {
    return (
        <main class= "min-h-screen bg-background p-8 text-foreground" >
        <div class="mx-auto max-w-xl space-y-6" >
            <div>
            <h1 class="text-3xl font-semibold" >
                ForexHighway
                </h1>

                < p class="mt-2 text-muted-foreground" >
                    Trading.Learning.Investing.
          </p>
                    </div>

                    < div class="flex flex-wrap gap-3" >
                        <Button>Get Started </Button>
                            < Button variant = "outline" > Learn More </Button>
                                < Button variant = "secondary" > Dashboard </Button>
                                    </div>
                                    </div>
                                    </main>
  )
}