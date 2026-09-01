export default function Header({
  title,
  count,
  onRemove,
}: {
  title: string;
  count: number;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
        backgroundColor: "#1f2937",
        borderBottom: "1px solid #374151",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {title}
        </h2>

        <span
          style={{
            backgroundColor: "#dbeafe",
            color: "#1e40af",
            padding: "2px 10px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {count}
        </span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "50%",
          backgroundColor: "transparent",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}