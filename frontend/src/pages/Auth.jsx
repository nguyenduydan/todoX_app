import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import api from '@/lib/axios';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({
            username: '',
            email: '',
            password: '',
        });
    }, [isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = isLogin ? '/auth/login' : '/auth/register';
            const res = await api.post(url, formData);

            // ✅ Axios trả về res.data, không phải res.ok
            const data = res.data;

            // ✅ Lưu token và user vào localStorage
            localStorage.setItem('token', data.token);

            toast.success(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!');

            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } catch (error) {
            console.error('Lỗi xảy ra:', error);
            toast.error('Có lỗi xảy ra khi kết nối server');
        }
        finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#020617] relative">
            {/* Nền grid bóng tối */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#020617",
                    backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
                    backgroundSize: "32px 32px, 32px 32px, 100% 100%",
                }}
            />
            <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
                <Card className="w-full max-w-md bg-black/60 text-white border border-gray-800 shadow-xl">
                    <CardHeader>
                        <h1 className="text-center text-4xl text-primary font-bold">
                            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Tên người dùng"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            )}

                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />

                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="none"
                                    size="icon"
                                    className="absolute right-2 top-0 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Button
                                variant="gradient"
                                type="submit"
                                className={`w-full flex items-center justify-center gap-2 transition-all duration-300 ${loading ? "opacity-80 scale-[0.98]" : "opacity-100 scale-100"
                                    }`}
                                disabled={loading}
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isLogin ? "Đăng nhập" : "Đăng ký"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <div className="text-center text-sm w-full">
                            {isLogin ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? '}
                            <Button
                                variant="link"
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-medium cursor-pointer"
                            >
                                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Auth;
