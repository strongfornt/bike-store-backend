import mongoose, { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this?.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }


  filter() {
    const queryObj: any = { ...this.query };
    
    //Filtering
    const excludeFields = ["search", "sort", "limit", "page"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.minPrice || queryObj.maxPrice) {
      const priceRange: any = {};
      if (queryObj.minPrice) priceRange.$gte = Number(queryObj.minPrice);
      if (queryObj.maxPrice) priceRange.$lte = Number(queryObj.maxPrice);
      queryObj.price = priceRange;
      delete queryObj.minPrice;
      delete queryObj.maxPrice;
    }
    

    if (queryObj.inStock !== undefined) {
      queryObj.inStock = queryObj.inStock === "true";
    }
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // field() {
  //   const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '';
  //   this.modelQuery = this.modelQuery.select(fields);
  //   return this;
  // }

  excludeFields(excludeFields: string) {
    this.modelQuery = this.modelQuery.select(excludeFields);
    return this;
  }
}

export default QueryBuilder;
