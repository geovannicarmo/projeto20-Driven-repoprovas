import { User, Tests } from "@prisma/client";

export type TUser = Omit<User, 'id'>

export type TTests = Omit<Tests, 'id'>