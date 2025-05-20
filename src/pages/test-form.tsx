import { RegisterForm } from '@/components/forms/RegisterForm';

const TestFormPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Contact Form</h1>
        <div className="border-t border-gray-200 pt-6">
          <RegisterForm onSuccess={() => {
            console.log('Form submitted successfully!');
            alert('Form submitted successfully!');
          }} />
        </div>
      </div>
    </div>
  );
};

export default TestFormPage;
