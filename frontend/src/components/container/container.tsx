export interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center m-auto w-full mt-8 m-auto'>
      {children}
    </div>
  );
};
