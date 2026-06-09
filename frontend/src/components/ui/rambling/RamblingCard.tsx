export default function RamblingCard({ ramblings }: any) {
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
        id="rambling-section"
          key={index}
          className="p-4  bg-slate-50 rambling-card text-base/8 center"
          dangerouslySetInnerHTML={{ __html: rambling.content }}
        />
      ))}
    </>
  );
}
