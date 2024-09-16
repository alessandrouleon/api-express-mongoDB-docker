import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import {
    getParametersToPaginate, PaginatedData, paginateResponse
} from '../../../shared/utils/pagination';
import { PaginatedUserDTO } from '../../dtos/users/paginated-user.dto';

export class GetUserUseCase {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    private async getValuesInUsers(value: string, { skip, take, page }: PaginatedData) {
        const userSearch = await this.userRepository.findFilteredUsersWithPagination(value, { skip, take, page });

        if (!userSearch) {
            return { users: [], total: 0, page, take };
        }
        const { users, total } = userSearch;
        const goal = paginateResponse({ total, page, take });
        return { users, ...goal };
    }

    private async getAllUsersPaginated({ skip, take, page }: PaginatedData) {

        const { users, total } = await this.userRepository.findAllUsersWithPagination({ skip, take, page });
        const goal = paginateResponse({ total, page, take });

        return { users, ...goal };
    }

    public async getUsers(value: string, pageNumber: number): Promise<PaginatedUserDTO> {
        const { skip, take, page } = getParametersToPaginate(pageNumber);
        let getUser: any;
        if (!value) {
            getUser = await this.getAllUsersPaginated({ page, skip, take });
        }
        if (value) {
            getUser = await this.getValuesInUsers(value, { page, skip, take });
        }
        return getUser;
    }



}