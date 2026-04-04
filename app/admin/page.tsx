import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ShieldCheck, LockIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Portal',
    robots: {
        index: false,
        follow: false,
    },
};

type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminLogin({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const error = resolvedParams?.error;

    async function login(formData: FormData) {
        'use server';
        
        const password = formData.get('password');
        const adminPassword = process.env.ADMIN_PASSWORD;
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;

        if (password === adminPassword && adminPassword && sessionSecret) {
            const cookieStore = await cookies();
            cookieStore.set('admin_session', sessionSecret, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 // 1 day
            });
            redirect('/admin/dashboard');
        } else {
            redirect('/admin?error=invalid');
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-10">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center ring-8 ring-blue-50">
                        <ShieldCheck className="w-10 h-10 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">Admin Portal</h2>
                <p className="text-center text-slate-500 mb-8">Enter your secure credentials to access the dashboard.</p>
                
                {error === 'invalid' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center justify-center font-medium">
                        Invalid password. Please try again.
                    </div>
                )}
                
                <form action={login} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Admin Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-sm placeholder-slate-600"
                                placeholder="Enter secure password"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
                    >
                        Secure Login
                    </button>
                </form>
            </div>
            <p className="mt-8 text-sm text-slate-400">
                Pristine Security Service Limited &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
}
