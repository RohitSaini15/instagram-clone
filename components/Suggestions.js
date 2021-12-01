import { useState, useEffect } from "react";
import faker from "faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between font-semibold mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold"></button>
      </div>

      {suggestions.map((profile) => {
        return (
          <div
            key={profile.id}
            className="flex items-center justify-between mt-3"
          >
            <img
              className="w-10 h-10 rounded-full border p-[2px]"
              src={profile.avatar}
              alt=""
            ></img>

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-xs text-gray-400">
                Works at {profile.company.name}
              </h3>
            </div>

            <button className="text-blue-400 font-bold text-xs">Follow</button>
          </div>
        );
      })}
    </div>
  );
}

export default Suggestions;
