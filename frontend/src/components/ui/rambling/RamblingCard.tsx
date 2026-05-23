export default function RamblingCard({ ramblings }: any) {
  const style = {};
  return (
    <>
      <style>{`
        .rambling-card pre{
    background: black;
    color: white;
    padding: 10px;
    margin: 1em 0;
    border-radius: .5em;
        }

      `}</style>
      {ramblings.map((rambling: any, index: number) => (
        <div
          key={index}
          className="p-4 rambling-card"
          dangerouslySetInnerHTML={{ __html: rambling.content }}
        />
      ))}
    </>
  );
}
