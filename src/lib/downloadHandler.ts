export const handleClick = ({
  item,
}: {
  item: { id: string; name: string };
}) => {
  const params = new URLSearchParams({
    id: item.id,
    name: item.name,
  });
  console.log(item)
  const url = "/api/graph/download?" + params.toString();
  const a = document.createElement("a");
  a.href = url;
  a.download = item.name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
