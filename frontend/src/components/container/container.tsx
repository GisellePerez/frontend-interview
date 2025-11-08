export interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center m-auto w-full my-4 md:my-8 max-w-full px-4 md:min-w-[500px] md:max-w-3xl'>
      {children}
    </div>
  );
};
