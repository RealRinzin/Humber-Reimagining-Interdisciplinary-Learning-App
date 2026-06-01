"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faGear } from "@fortawesome/free-solid-svg-icons";
import { clientFetch } from "@/lib/clientFetch";
import Checkbox from "../form/Checkbox";
import { useEffect, useState } from "react";
interface UserSettings {
  id: number;
  video: boolean;
  code: boolean;
  quiz: boolean;
  interactive: boolean;
  explore_mode: boolean;
  guide_path: boolean;
  progress: boolean;
  rambling: boolean;
}
/**
 * Main Return Function
 */
export default function ContentSetting() {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  // getUserSetting();
  async function getUserSetting() {
    // Content settin
    const content_setting = await clientFetch(
      `/user-content-settings/users/me`,
    );
    const { data: settings } = await content_setting.json();
    console.log(settings)
    setUserSettings(settings);
  }
  // Use Effect
  useEffect(() => {
    getUserSetting();
  }, []);

  if (!userSettings) return <p>Loading...</p>;
  return (
    <>
      <div className="bg-gray-200 rounded-lg p-6">
        <h5 className="font-bold text-gray-700">
          <FontAwesomeIcon icon={faGear} /> Content Setting{" "}
          <FontAwesomeIcon icon={faCaretDown} />
        </h5>
        <p className="text-sm py-4">
          Select the content you want to focus on. Your Choics will be
          prioritized, and you'll be able to track progress as you complete
          them.
        </p>
        <div className="flex gap-10 justify-start text-gray-600">
          <ul className="flex flex-col gap-4">
            <li>
              <Checkbox
                name={"video"}
                value={userSettings?.video ?? false}
                id={userSettings?.id}
              />
            </li>
            <li>
              <Checkbox
                name={"interactive"}
                value={userSettings?.interactive ?? false}
                id={userSettings?.id}
              />
            </li>
            <li>
              <Checkbox
                name={"code"}
                value={userSettings?.code ?? false}
                id={userSettings?.id}
              />
            </li>
          </ul>
          <ul className="flex flex-col gap-4">
            <Checkbox
              name={"quiz"}
              value={userSettings?.quiz ?? false}
              id={userSettings?.id}
            />
            <li>
              <Checkbox
                name={"rambling"}
                value={userSettings?.rambling ?? false}
                id={userSettings?.id}
              />
              <span className="text-gray-500 text-sm">
                {" "}
                Extra thoughts and insights from your professor.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
