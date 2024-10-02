import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getFirebaseAuth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { readUser } from '../firebase/userController';
import bcryptjs from 'bcryptjs';

const auth = getFirebaseAuth();

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      loginError: null,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setLoginError: (loginError) => set({ loginError }),
      
      login: async (medicalCode, password) => {
        set({ isLoading: true, loginError: null });
        try {
          let userData = await readUser(medicalCode);
          if (!userData) {
            throw new Error("You are not registered in the system, please sign up");
          }
          
          const isValidPassword = await bcryptjs.compare(password, userData.password);
          if (!isValidPassword) {
            throw new Error("Medical code or/and password incorrect");
          }
          
          await signInWithEmailAndPassword(auth, userData.email, userData.password);
          
          // Store important user data, but exclude sensitive information like password
          const userDataToStore = {
            medicalCode: userData.medicalCode,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            // Add any other important fields you want to keep in the state
          };
          
          set({ 
            user: userDataToStore, 
            isAuthenticated: true, 
            isLoading: false,
            loginError: null
          });
        } catch (error) {
          console.error("Error signing in:", error);
          set({ 
            loginError: error.message, 
            isLoading: false,
            user: null,
            isAuthenticated: false
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await signOut(auth);
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            loginError: null
          });
        } catch (error) {
          console.error("Error signing out:", error);
          set({ 
            loginError: "Error signing out. Please try again.", 
            isLoading: false 
          });
        }
      },
      
      // You can add more actions here as needed, for example:
      updateUserProfile: (updatedData) => {
        set((state) => ({
          user: { ...state.user, ...updatedData }
        }));
      },
      
      // This action can be used to check if the user is still authenticated
      // You might call this when your app initializes or after certain intervals
      checkAuthState: () => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            set({ isAuthenticated: true, user: user });
          } else {
            // User is signed out
            set({ isAuthenticated: false, user: null });
          }
          set({ isLoading: false });
        });
        
        // Return unsubscribe function to stop listening to auth state changes
        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage', // name for the persisted storage
      storage: createJSONStorage(() => sessionStorage), // use sessionStorage instead of localStorage
    }
  )
);

export default useAuthStore;