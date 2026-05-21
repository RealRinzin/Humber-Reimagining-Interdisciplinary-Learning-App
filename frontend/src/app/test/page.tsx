export default function TestPage() {
  const data = '<p> Here is an introductory sentence for your paragraph. <img src="https://placeholder.com" alt="Example Image 1"> Here is some text placed right between the visuals. <img src="https://placeholder.com" alt="Example Image 2"> And this concludes the final part of your paragraph text. <pre><code class="cpp"> void func() { x = 5+ 2; } </code></pre></p>'
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
