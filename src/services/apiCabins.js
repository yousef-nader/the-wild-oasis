import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Failed to get cabins");

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin could not be deleted");
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://pyvrylgwmyrbvjqdtnhj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // create/edit cabin
  let query = supabase.from("cabins");
  // a) create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //b) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cabin could not be created");
  //2. if create cabin successfull upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete the cabin if there was an error uploading the corresponding image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError.message);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}
