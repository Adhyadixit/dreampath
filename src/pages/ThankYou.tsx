import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You!
        </h2>
        <p className="mt-2 text-gray-600">
          We've received your inquiry and our team will get back to you within 24-48 hours.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/services">
              Browse Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
