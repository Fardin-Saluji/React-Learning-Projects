const useFormValidation = () => {
  const validate = (name, phone, email) => {
    if (!name || !phone || !email) return false;
    if (phone.length < 10) return false;
    return true;
  };

  return { validate };
};

export default useFormValidation;
