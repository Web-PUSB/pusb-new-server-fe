import React from "react";
import { Button, Label, TextInput } from "flowbite-react";

const FormJobdesc = () => {
  return (
    <form action="#" className="mx-auto mb-0 mt-8 max-w-xl space-y-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="John Dea"
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="jobdesc" value="Jobdesc" />
        </div>
        <TextInput
          id="jobdesc"
          type="text"
          placeholder="John Dea"
          required
          shadow
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-16 text-sm font-medium text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormJobdesc;
