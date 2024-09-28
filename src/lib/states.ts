import { create } from "zustand";

/* Modal States */
interface ModalStore {
    modal: string;
    options: any;
    loading: boolean;
    setModal: (type: string, options: any) => void;
    setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
    modal: "", // Modal Key
    options: {},
    loading: false,
    setModal: (type, options = {}) =>
        set(() => ({
            modal: type,
            options: options,
        })),
    setLoading: loading => set(() => ({ loading })),
}));

/* User States */
interface IUser {
    username: string;
    email: string;
    avatar: string;
    balance: number;
    registerDate: Date;
}

interface IUserStore {
    user: IUser | null;
    setUser: (user: any | null) => void;
}

export const useUserStore = create<IUserStore>(set => ({
    user: null,
    setUser: user => set(() => ({ user })),
}));
