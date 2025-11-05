export type StatusVariant = "error" | "warning" | "success";

type StatusBadgeProps = { status: StatusVariant };

export const GetStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "error":
      return <div className="bg-[#FEE4E2] w-fit text-[#D92D20] px-4 rounded-full">{status}</div>;
    case "warning":
      return <div className="bg-[#fffaeb]  w-fit text-[#f79009] px-4 rounded-full">{status}</div>;
    case "success":
      return <div className="bg-success-100  w-fit text-[#05ba17] px-4 rounded-full">{status}</div>;
    default:
      return <div className="bg-error-100  w-fit   text-error-600 px-4 rounded-full">Unknown Status</div>;
  }
};
