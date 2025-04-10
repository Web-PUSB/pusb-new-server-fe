import React from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
const FormPostWorkplan = () => {
  return (
    <form action="#" className="mx-auto mb-0 mt-8 max-w-3xl space-y-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Post Name" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="John Dea"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Post Link" />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="John Dea"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description Post" />
        </div>
        <Textarea
          id="description"
          placeholder="Put the Workplan description...."
          required
          rows={4}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-20 text-sm font-medium text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FormPostWorkplan;
