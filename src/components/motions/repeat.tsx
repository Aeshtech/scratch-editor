const Repeat = ({ motionId }: { motionId: string }) => {
  return (
    <div
      id={motionId}
      className="flex flex-wrap w-full bg-primary text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
      Repeat 10 steps
    </div>
  );
};

export default Repeat;
