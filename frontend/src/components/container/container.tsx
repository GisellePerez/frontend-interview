export interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex justify-center m-auto w-full mt-8'>{children}</div>
  );
};
