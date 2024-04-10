import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message: string, containerId: string = "mainContainer") => toast.success(message, {containerId: containerId});

export const notifyFailure = (message: string, containerId: string = "mainContainer") => toast.error(message, {containerId: containerId});