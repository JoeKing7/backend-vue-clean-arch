import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { SigninDto } from './dto/signin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class LoginService {
  create(_createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }
  signin(signinDto: SigninDto) {
    const { identificationNumber, expeditionDate } = signinDto;

    if (identificationNumber == '123' && expeditionDate == '123') {
      return {
        user: {
          username: 'superadmin',
          changePassword: false,
          singleSession: true,
          active: true,
          firstname: 'Super',
          firstsurname: 'Admin',
          dni: '9009666568',
          dniexpdate: '2010-01-01',
          birthdate: '2010-01-01',
          email: 'tpsadmin@mailinator.com',
          celularphone: '3009090808',
          localphone: '6013120987',
          role: {
            id: 1,
            code: 'root',
            name: 'Root',
            description: 'Usuario Root',
          },
          permissions: [
            'auth:basic',
            'permission:index',
            'permission:show',
            'permission:store',
            'permission:update',
            'permission:delete',
            'role:index',
            'role:show',
            'role:store',
            'role:update',
            'role:delete',
            'ani:show',
            'role:permission-by-role',
            'menu:index',
            'menu:show',
            'menu:store',
            'menu:update',
            'menu:delete',
            'user:index',
            'user:show',
            'user:store',
            'user:update',
            'user:delete',
          ],
          menu: [
            {
              title: 'Home',
              icon: 'icon',
              route: 'home',
              permission: 'auth:basic',
            },
            {
              title: 'Menu1',
              icon: 'icon',
              route: 'menu1',
              permission: 'auth:basic',
              children: [
                {
                  title: 'Menu1a',
                  icon: 'icon',
                  route: 'menu-a',
                  permission: 'auth:basic',
                },
                {
                  title: 'Menu1b',
                  icon: 'icon',
                  route: 'menu-b',
                  permission: 'auth:basic',
                },
              ],
            },
            {
              title: 'Menu2',
              icon: 'icon',
              route: 'menu2',
              permission: 'auth:basic',
              children: [
                {
                  title: 'Menu2a',
                  icon: 'icon',
                  route: 'menu2-a',
                  permission: 'auth:basic',
                },
                {
                  title: 'Menu2b',
                  icon: 'icon',
                  route: 'menu2-b',
                  permission: 'auth:basic',
                },
              ],
            },
          ],
        },
        accessToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoicm9vdCIsImVtdWxhdGVkSWQiOi0xLCJ1c2VySWQiOjEsInN1YiI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MDYzMDk4MDgsImV4cCI6MTcwNjMxMzQwOH0.0paxSa8218LPqA88Q5PjtID9jMIixWJ6C3t4a73qAR_NpNvRPmaN8M_G5p9U2y5PRno77WD-LWeog5iOiEn8fQ',
        refreshToken:
          'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoicm9vdCIsImVtdWxhdGVkSWQiOi0xLCJ1c2VySWQiOjEsInN1YiI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MDYzMDk4MDgsImV4cCI6MTcwNjMxNDAwOH0.HAyEr9so68HuejosCvBY6LxwaAjE2H4zUkkFxUOhGrF7K7o3T9n0Eb9XnH8XW3yaSM9rnrC5WYZ09Gh7_K8PkA',
        emulatedId: -1,
        idleTime: 300,
      };
    }

    throw new BadRequestException({
      type: 'error',
      fields: {
        password: 'La contraseña no puede ser nula',
      },
      message: 'No se pudo procesar su solicitud. Usuario no encontrado.',
    });
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, _updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  updatePassword(updateLoginDto: ChangePasswordDto) {
    console.log(updateLoginDto);

    if (updateLoginDto) {
      return {
        status: 'OK',
        message: 'Contraseña cambiada.',
      };
    }

    throw new BadRequestException({
      type: 'error',
      fields: {
        password: 'La contraseña no puede ser nula',
      },
      message: 'No se pudo procesar su solicitud. Credenciales incorrectas.',
    });
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
