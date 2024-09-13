import { useEffect, useState } from "react";
import { classNames } from "../../../../utils/classList";

export const useCrescoTabs = (tabs: string[], active = "") => {
  const [activeTab, setActiveTab] = useState(active);
  return {
    activeTab,
    propsCrescoTabs: {
      activeTab,
      setActiveTab,
      tabs,
    },
  };
};
export const CrescoTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((t) => t === activeTab) as any}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab}
              className={classNames(
                tab === activeTab
                  ? "text-cresco-violet border-b-2 border-cresco-violet"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm cursor-pointer "
              )}
              aria-current={tab === activeTab ? "page" : undefined}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
