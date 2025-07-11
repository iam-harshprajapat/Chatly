import React, { useState, useRef, useEffect, cloneElement } from "react";

const DropdownMenu = ({ trigger, items = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const triggerRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clone trigger so we can inject onClick + ref
  const clonedTrigger = cloneElement(trigger, {
    ref: triggerRef,
    onClick: () => setOpen((prev) => !prev),
  });

  return (
    <div className="relative inline-block">
      {clonedTrigger}

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
        >
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  item.action?.();
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
