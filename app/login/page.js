"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './login.module.scss';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastId, setToastId] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const loginPromise = toast.promise(
      axios.post('/api/auth', { username, password }),
      {
        loading: 'Logging in...',
        success: 'Login successful!',
        error: (err) => err.response?.data?.message || 'Login failed',
      }
    );
  
    try {
      const { data } = await loginPromise;
      const to = searchParams.get("to") || "/";
      const id = toast.loading('Redirecting to your destination...');
      setToastId(id)
      router.push(to);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  };


  useEffect(() => {
    return () => {
      if(toastId) toast.dismiss(toastId)
    }
  },[toastId])


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>Log In</button>
        </form>
        <p className={styles.forgotPassword}>Forgot your password?</p>
      </div>
    </div>
  );
}
