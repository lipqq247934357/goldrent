<h3>基础资料</h3>

<ul>
    <upload @handlePictureCardPreview="handlePictureCardPreview" />
    <li>
        <div>营业执照副本原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>开户许可证原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>公司章程工商调档原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>法人、实际控制人身份证原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>法人、实际控制人户口簿原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>法人、实际控制人婚姻状况证明材料原件</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
</ul>

<h3>财务资料</h3>
<ul>
    <li>
        <div>审计报告（财务报表）</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
    <li>
        <div>纳税申请表</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
</ul>

<h3>征信证明材料</h3>
<ul>
    <li>
        <div>人行征信报告</div>
        <div class="edit-pic">
            <el-upload
                    :file-list="fileList"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </li>
</ul>
