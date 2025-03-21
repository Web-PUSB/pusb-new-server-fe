import React from "react";
import { FileInput, Label, TextInput, Select } from "flowbite-react";
//image
//name
//ministryid
//instagram , linkedin
//majoring
//exe/minister/member
const FormMember = () => {
  return (
    <form action="#" className="mx-auto mb-0 mt-8 max-w-2xl space-y-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Name" />
        </div>
        <TextInput
          id="email2"
          type="text"
          placeholder="John Dea"
          required
          shadow
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="ministry_id" value="Select Role" />
          </div>
          <Select id="ministry_id" required>
            <option value={`US`}>Role</option>
            <option>Executive</option>
            <option>Minister</option>
            <option>Member</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="ministry_id" value="Select Minister" />
          </div>
          <Select id="ministry_id" required>
            <option value={`US`}>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="major_id" value="Select Majoring" />
        </div>
        <Select id="major_id" required>
          <option value={`US`}>United States</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </Select>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="major" value="Member Major" />
        </div>
        <TextInput
          id="major"
          type="email"
          placeholder="Informatics"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Member Picture" />
        </div>
        <FileInput id="file" helperText="A picture of member" />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="w-full lg:w-1/2 py-2.5 inline-block rounded-lg bg-blue-500 px-20 text-sm font-medium text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormMember;
