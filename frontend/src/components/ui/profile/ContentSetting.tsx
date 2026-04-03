export default function ContentSetting() {
  return (
    <>
      <div className="bg-gray-200 rounded-lg p-6">
        <h5 className="font-bold text-gray-700">Content Setting</h5>
        <p className="text-sm py-4">
          Select the content you want to focus on. Your Choics will be
          prioritized, and you'll be able to track progress as you complete
          them.
        </p>
        <div className="flex gap-10 justify-start text-gray-600">
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Videos
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Interactive Demos
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Codes
              </label>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Quizes
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Written Explanation
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Surveys
              </label>
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Ramblings
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Audio Bites
              </label>
            </li>
            <li>
              <label htmlFor="videos">
                <input type="radio" />
                Resources
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
