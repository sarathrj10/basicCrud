export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export enum userValidationType {
  Register,
  Login,
}

interface IBook {
  title: string;
  author: string;
  price: number;
}

interface IUser {
  name?: string;
  email: string;
  password: string;
  type: userValidationType;
}

export const bookValidation = (
  data: IBook
): { success: boolean; message: string } => {
  if (!data.title) return { success: false, message: "Title is required" };

  if (!data.author) return { success: false, message: "Author is required" };

  if (!data.price) return { success: false, message: "Price is required" };

  if (data.price <= 0)
    return { success: false, message: "Price should be greater than 0" };

  return { success: true, message: "" };
};

export const userValidation = (
  data: IUser
): { success: boolean; message: string } => {

  if (data.type === userValidationType.Register) {
    if (!data.name) return { success: false, message: "Name is required" };
  }

  if (!data.email) return { success: false, message: "Email is required" };

  if (!data.password)
    return { success: false, message: "Password is required" };

  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (!regex.test(data.email))
    return { success: false, message: "Invalid Email" };

  return { success: true, message: "" };
};
